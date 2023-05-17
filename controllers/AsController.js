var express = require('express');
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });
const odbc = require('odbc');
//var validator = require('express-validator');
//var axios = require("axios");

//As400
async function getAs(pars){		
	const dtini = await SetRangeData(pars.start);
	const dtfin = await SetRangeData(pars.end);
	var where = await DecWhere(pars);
	var param = await DecWhere1(pars);
	
	if(where === undefined){
		where = ' LABDT0 >= ? AND LABDT0 <= ? '
		param = [
			dtini,
			dtfin
		];
	} 

	const cn1 = "DSN=nodejs;UID=dinoceraa;PWD=antodino";
	const connection = await odbc.connect(cn1);
	const data = await connection.query('SELECT LAARE0, LANRE0, LADER0, LATBO0,LABNR0,LABDT0,LABTI0,LASTR0,COUNT(*) as TCNT  FROM L0__STDAT.LABOLF0 WHERE ' + where + ' GROUP BY LAARE0, LANRE0, LADER0, LATBO0, LATBO0,LABNR0,LABDT0,LABTI0,LASTR0 ORDER BY LANRE0' , param);
	return data;
}

async function SetRangeData(data) {
	var num = Number(data);
	if(data!==undefined){
		if(num !== 0){
			var dtset=(data);
			var aa = dtset.substring(6, 10);
			var mm = dtset.substring(3, 5);
			var gg = dtset.substring(0, 2);
			var dtset = aa + '-' + mm + '-' + gg;
	} else {
			const dtday = new Date();
			//const dtday1 = new Date();
			//dtday1.setDate(dtday.getDate() - 1);
			var dtset = giraData(dtday);
			//var dtini = giraData(dtday1);
	} 
	} else {
		const dtday = new Date();
		var dtset = giraData(dtday);
		//const dtday1 = new Date();
		//dtday1.setDate(dtday.getDate() - 1);
		//var dtini = giraData(dtday1);
		} 
	return dtset;
}

async function DecWhere(pars) {
	for (var prop in pars) {
		var campi;
		if(pars[prop]!==undefined && +pars[prop]!==0 && pars[prop]!==""){
			if(campi===undefined){		
				if(prop === 'start') {
					prop = 'LABDT0';
					campi = prop + ' >= ? ';
				}
				 else if(prop === 'end') {
					prop = 'LABDT0';
					campi = prop + ' <= ? ';
				}
				else {
					campi = prop + ' = ? ';
				}
			}else{
				if(prop === 'start') {
					prop = 'LABDT0';
					campi += 'AND ' + prop + ' >= ? '; 
				}
				else if(prop === 'end') {
					prop = 'LABDT0';
					campi += 'AND ' + prop + ' <= ? '; 
				}
				else {
					campi += 'AND ' + prop + ' = ? '; 
				}
			}
		};
	  }
	  return campi;
  }

  async function DecWhere1(pars) {
	var dati=[];
	for (var prop in pars) {
		if(pars[prop]!==undefined && +pars[prop]!==0 && pars[prop]!==""){
				if(prop === 'start') {
					dati.push(giraData1(pars[prop]));
				}
				 else if(prop === 'end') {
					dati.push(giraData1(pars[prop]));
				}
				else {
					dati.push(pars[prop]);
				}
		};
	  }
	  return dati;
  }

function giraData (data) {
	gg = data.getDate();
	mm = data.getMonth()+1;
	aa = data.getFullYear();
	let ggg = "";
	if(gg<10){
		ggg = "0"+gg;
	}else{
		ggg = gg;
	}
	let mmm = "";
	if(mm<10){
		mmm = "0"+mm;
	}else{
		mmm = mm;
	}
	const dtgira = aa +'-'+ mmm + '-' + ggg;
	return dtgira;
}

function giraData1 (data) {
	var aa = data.substring(6, 10);
	var mm = data.substring(3, 5);
	var gg = data.substring(0, 2);
	var data = aa + '-' + mm + '-' + gg;
	return data;
}

async function getBolleDet(param1,param2){	
	//console.log(param1);
	//console.log(param2);
	param = [
		param1,
		param2,
		'ARM',
		'NAV'
	];
	const cn1 = "DSN=nodejs;UID=dinoceraa;PWD=antodino";
	const connection = await odbc.connect(cn1);
	const data = await connection.query("SELECT LACTR0, LAIDV0, LAMRN0, LACAR0, LACNA0, LACIM0, a.TABDTA, b.TABDTA  FROM L0__STDAT.LABOLF0 JOIN TABEGEN as a ON CONCAT('0',CAST(LACAR0 AS varchar(10)))= a.kfld2 JOIN TABEGEN01L as b ON CAST(LACNA0 AS varchar(10))= b.kfld2  WHERE LAARE0 = ? AND LANRE0 = ? AND a.KFLD1 = ? AND b.KFLD1 = ?" , param);
	console.log(data);
	return data;
}

module.exports =  {
	getAs,
	getBolleDet
};