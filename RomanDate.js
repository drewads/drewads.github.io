var months_accusative = ['', 'Ianuarias', 'Februarias', 'Martias', 'Apriles', 'Maias', 'Iunias', 'Iulias', 'Augustas', 'Septembres', 'Octobres', 'Novembres', 'Decembres', 'Ianuarias']
var months_ablative = ['', 'Ianuariis', 'Februariis', 'Martiis', 'Aprilibus', 'Maiis', 'Iuniis', 'Iuliis', 'Augustis', 'Septembribus', 'Octobribus', 'Novembribus', 'Decembribus', 'Ianuariis']

var numbers_accusative = ['nihil', 'primum', 'secundum', 'tertium', 'quartum', 'quintum', 'sextum', 'septimum', 'octavum', 'nonum', 'decimum', 'undecimum', 'duodecimum', 'tertium decimum', 'quartum decimum', 'quintum decimum', 'sextum decimum', 'septimum decimum', 'duodevicesimum', 'undevicesimum', 'vicesimum']

function romanDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getYear();

    var lastDayOfMonth = new Date(year, month, 0).getDate()

    var kalends = 1;
    var nones = 5;
    var ides = 13;
    if ([3, 5, 7, 10].indexOf(month) != -1) {
        nones = 7;
        ides = 15;
    }

    if (day == kalends) {
        return 'Kalendis ' + months_ablative[month];
    }

    if (day > kalends && day < (nones - 1)) {
        return 'ante diem ' + numbers_accusative[nones - day + 1] + ' Nonas ' + months_accusative[month];
    }

    if (day == nones - 1) {
        return 'pridie Nonas ' + months_accusative[month];
    }

    if (day == nones) {
        return 'Nonis ' + months_ablative[month];
    }

    if (day > nones && day < (ides - 1)) {
        return 'ante diem ' + numbers_accusative[ides - day + 1] + ' Idus ' + months_accusative[month];
    }

    if (day == ides - 1) {
        return 'pridie Idus ' + months_accusative[month];
    }

    if (day == ides) {
        return 'Idibus ' + months_ablative[month];
    }

    if (day > ides && day < lastDayOfMonth) {
        return 'ante diem ' + numbers_accusative[(lastDayOfMonth + 1) - day + 1] + ' Kalendas ' + months_accusative[month + 1];
    }

    if (day == lastDayOfMonth) {
        return 'pridie Kalendas ' + months_accusative[month + 1];
    }
}

function romanize(string) {
    return string.replace(new RegExp('U', 'g'), 'V').replace(new RegExp('v', 'g'), 'u');
}

var date = new Date();
document.getElementById("romanDate").innerText = (romanize(romanDate(date)));