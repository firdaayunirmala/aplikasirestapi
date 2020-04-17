-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 17 Apr 2020 pada 04.54
-- Versi server: 10.1.38-MariaDB
-- Versi PHP: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_bengkel`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_level`
--

CREATE TABLE `t_level` (
  `id_level` int(11) NOT NULL,
  `nama_level` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `t_level`
--

INSERT INTO `t_level` (`id_level`, `nama_level`) VALUES
(1, 'admin'),
(2, 'pelanggan');

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_montir`
--

CREATE TABLE `t_montir` (
  `id_montir` int(11) NOT NULL,
  `nama_montir` varchar(50) NOT NULL,
  `harga_perjam` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `t_montir`
--

INSERT INTO `t_montir` (`id_montir`, `nama_montir`, `harga_perjam`) VALUES
(1, 'muhammad', 10000),
(2, 'pratama', 15000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_servis`
--

CREATE TABLE `t_servis` (
  `id_servis` int(11) NOT NULL,
  `tgl_servis` date NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_montir` int(11) NOT NULL,
  `jumlah_sparepart` int(11) NOT NULL,
  `id_sparepart` int(11) NOT NULL,
  `total_servis` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `t_servis`
--

INSERT INTO `t_servis` (`id_servis`, `tgl_servis`, `id_user`, `id_montir`, `jumlah_sparepart`, `id_sparepart`, `total_servis`) VALUES
(1, '2020-04-14', 1, 1, 2, 1, 0),
(2, '2020-04-14', 1, 1, 2, 2, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_sparepart`
--

CREATE TABLE `t_sparepart` (
  `id_sparepart` int(11) NOT NULL,
  `nama_sparepart` varchar(50) NOT NULL,
  `harga_sparepart` int(20) NOT NULL,
  `satuan` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `t_sparepart`
--

INSERT INTO `t_sparepart` (`id_sparepart`, `nama_sparepart`, `harga_sparepart`, `satuan`) VALUES
(1, 'Kabel Spidometer Honda Beat 110 CC', 18000, 'Unit'),
(2, 'Kabel Kopling Honda GL Pro Neotech', 23000, 'Unit');

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_user`
--

CREATE TABLE `t_user` (
  `id_user` int(11) NOT NULL,
  `nama_user` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` int(11) NOT NULL,
  `level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `t_user`
--

INSERT INTO `t_user` (`id_user`, `nama_user`, `email`, `password`, `level`) VALUES
(1, 'firda', 'firdabae@gmail.com', 123, 1),
(2, 'ayu', 'ayunirmala@gmail.com', 321, 2);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `t_level`
--
ALTER TABLE `t_level`
  ADD PRIMARY KEY (`id_level`);

--
-- Indeks untuk tabel `t_montir`
--
ALTER TABLE `t_montir`
  ADD PRIMARY KEY (`id_montir`);

--
-- Indeks untuk tabel `t_servis`
--
ALTER TABLE `t_servis`
  ADD PRIMARY KEY (`id_servis`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_montir` (`id_montir`),
  ADD KEY `id_sparepart` (`id_sparepart`);

--
-- Indeks untuk tabel `t_sparepart`
--
ALTER TABLE `t_sparepart`
  ADD PRIMARY KEY (`id_sparepart`);

--
-- Indeks untuk tabel `t_user`
--
ALTER TABLE `t_user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `level` (`level`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `t_level`
--
ALTER TABLE `t_level`
  MODIFY `id_level` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `t_montir`
--
ALTER TABLE `t_montir`
  MODIFY `id_montir` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `t_servis`
--
ALTER TABLE `t_servis`
  MODIFY `id_servis` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `t_sparepart`
--
ALTER TABLE `t_sparepart`
  MODIFY `id_sparepart` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `t_user`
--
ALTER TABLE `t_user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `t_servis`
--
ALTER TABLE `t_servis`
  ADD CONSTRAINT `t_servis_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `t_user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `t_servis_ibfk_2` FOREIGN KEY (`id_montir`) REFERENCES `t_montir` (`id_montir`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `t_servis_ibfk_3` FOREIGN KEY (`id_sparepart`) REFERENCES `t_sparepart` (`id_sparepart`);

--
-- Ketidakleluasaan untuk tabel `t_user`
--
ALTER TABLE `t_user`
  ADD CONSTRAINT `t_user_ibfk_1` FOREIGN KEY (`level`) REFERENCES `t_level` (`id_level`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
