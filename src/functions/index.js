const formatNumber = (angka) => {
  let stringAngka = angka.toString();
  let number_string = stringAngka.replace(/[^,\d]/g, "").toString(),
    remove_zero = parseInt(number_string),
    string_zero = remove_zero.toString(),
    split = string_zero.split(","),
    sisa = split[0].length % 3,
    jumlah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    let separator = sisa ? "." : "";
    jumlah += separator + ribuan.join(".");
  }

  jumlah = split[1] !== undefined ? jumlah + "," + split[1] : jumlah;
  //   return prefix == undefined ? jumlah : jumlah ? jumlah : "";
  return jumlah;
};

export { formatNumber };
