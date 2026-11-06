// Minimalny zapis archiwum ZIP: metoda "store", a duże pliki deflate (patrz PROG_KOMPRESJI).
// Zero zależności zewnętrznych — pliki .skill to małe dokumenty tekstowe,
// więc kompresja nic tu nie zmienia, a brak zależności oznacza,
// że ten generator zbuduje się także za trzy lata.

const TABELA_CRC = (() => {
  const t = new Int32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = TABELA_CRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

// Stała data, żeby ten sam wsad dawał bajt w bajt ten sam plik.
// Dzięki temu build jest powtarzalny, a git nie pokazuje zmian tam, gdzie ich nie ma.
const CZAS_DOS = 0;
const DATA_DOS = ((2026 - 1980) << 9) | (1 << 5) | 1;

import { deflateRawSync } from "node:zlib";

// Pliki powyżej 64 KB (wbudowane teksty ustaw w skillu sprawy-prawne-w-firmie) kompresujemy metodą deflate
// z wbudowanego zlib Node; mniejsze zostają w trybie store, więc dotychczasowe paczki są bajt w bajt te same.
const PROG_KOMPRESJI = 64 * 1024;

export function zbudujZip(wpisy) {
  const lokalne = [];
  const centralne = [];
  let offset = 0;

  for (const { nazwa, dane } of wpisy) {
    const nazwaBuf = Buffer.from(nazwa, "utf8");
    const suma = crc32(dane);
    let zapis = dane, metoda = 0;
    if (dane.length > PROG_KOMPRESJI) {
      const d = deflateRawSync(dane, { level: 9 });
      if (d.length < dane.length * 0.9) { zapis = d; metoda = 8; }
    }

    const naglowek = Buffer.alloc(30);
    naglowek.writeUInt32LE(0x04034b50, 0);
    naglowek.writeUInt16LE(20, 4);
    naglowek.writeUInt16LE(0x0800, 6); // flaga: nazwy w UTF-8
    naglowek.writeUInt16LE(metoda, 8);
    naglowek.writeUInt16LE(CZAS_DOS, 10);
    naglowek.writeUInt16LE(DATA_DOS, 12);
    naglowek.writeUInt32LE(suma, 14);
    naglowek.writeUInt32LE(zapis.length, 18);
    naglowek.writeUInt32LE(dane.length, 22);
    naglowek.writeUInt16LE(nazwaBuf.length, 26);
    naglowek.writeUInt16LE(0, 28);

    lokalne.push(naglowek, nazwaBuf, zapis);

    const centralny = Buffer.alloc(46);
    centralny.writeUInt32LE(0x02014b50, 0);
    centralny.writeUInt16LE(20, 4);
    centralny.writeUInt16LE(20, 6);
    centralny.writeUInt16LE(0x0800, 8);
    centralny.writeUInt16LE(metoda, 10);
    centralny.writeUInt16LE(CZAS_DOS, 12);
    centralny.writeUInt16LE(DATA_DOS, 14);
    centralny.writeUInt32LE(suma, 16);
    centralny.writeUInt32LE(zapis.length, 20);
    centralny.writeUInt32LE(dane.length, 24);
    centralny.writeUInt16LE(nazwaBuf.length, 28);
    centralny.writeUInt16LE(0, 30);
    centralny.writeUInt16LE(0, 32);
    centralny.writeUInt16LE(0, 34);
    centralny.writeUInt16LE(0, 36);
    centralny.writeUInt32LE(0, 38);
    centralny.writeUInt32LE(offset, 42);

    centralne.push(centralny, nazwaBuf);
    offset += naglowek.length + nazwaBuf.length + zapis.length;
  }

  const bufLokalne = Buffer.concat(lokalne);
  const bufCentralne = Buffer.concat(centralne);

  const stopka = Buffer.alloc(22);
  stopka.writeUInt32LE(0x06054b50, 0);
  stopka.writeUInt16LE(0, 4);
  stopka.writeUInt16LE(0, 6);
  stopka.writeUInt16LE(wpisy.length, 8);
  stopka.writeUInt16LE(wpisy.length, 10);
  stopka.writeUInt32LE(bufCentralne.length, 12);
  stopka.writeUInt32LE(bufLokalne.length, 16);
  stopka.writeUInt16LE(0, 20);

  return Buffer.concat([bufLokalne, bufCentralne, stopka]);
}
