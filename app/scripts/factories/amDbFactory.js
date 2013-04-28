angular.module('angularCmsApp').factory('db', ['$window', function(window){
	var items = [];
	var DB = null;
	function initDatabase() {
		try {
			if (!window.openDatabase) {
				console.log('Databases are not supported in this browser.');
			} else {
				var shortName = 'myappmatrix';
				var version = '1.0';
				var displayName = 'AppMatrix Engine Database';
				var maxSize = 100000;
				//  bytes
				DB = openDatabase(shortName, version, displayName, maxSize);
				createTables();
			}
		} catch(e) {
			if (e == 2) {
				// Version number mismatch.
				console.log("Invalid database version.");
			} else {
				console.log("Unknown error " + e + ".");
			}
			return;
		}
	}
	/**
	 *
	 */
	function log(args) {
		console.log('[' + new Date().toTimeString() + ']' + '[log]', args);
	}
	/**
	 * I create all Web SQL tables for a module
	 *
	 *
	 * Example module Module.meta.schema
	 * [
	 * 	{"name":"id","type":"integer","default":null,"length":11},
	 * 	{"name":"title","type":"string","default":null,"length":255}
	 * ]
	 *
	 *
	 */
	function createTables() {
		log('createTables');
		/* */
		var tableSql = 'CREATE TABLE IF NOT EXISTS settings(' + 'id INTEGER NOT NULL PRIMARY KEY,' + 'title TEXT DEFAULT NULL,' + 'category TEXT DEFAULT NULL,' + 'appid TEXT DEFAULT NULL,' + 'name TEXT DEFAULT NULL,' + 'value TEXT DEFAULT NULL,' + 'created DATETIME,' + 'modified DATETIME,' + 'user_id INTEGER DEFAULT NULL,' + 'account_id INTEGER DEFAULT NULL,' + 'options TEXT,' + 'application_id INTEGER DEFAULT NULL,' + 'type TEXT DEFAULT NULL,' + 'input TEXT DEFAULT NULL' + ');';
		log(tableSql);
		//dropTables();
		initTable(tableSql);
		prePopulate();
	}
	/**
	 * I create a table
	 */
	function initTable(tableSql) {
		log('Creating table ', tableSql);
		DB.transaction(function(transaction) {
			transaction.executeSql(tableSql, [], nullDataHandler, errorHandler);
		});
	}
	/**
	 * I pre-populate the table with default data.
	 */
	function prePopulate() {
		log('prePopulate - Settings table');
		DB.transaction(function(transaction) {
			//Optional Starter Data when app is initialized
			var data = ['1', 'none', '#B3B4EF', 'Helvetica', 'Porsche 911 GT3', 'five', 'size', 'seven', 'eight', 'nine', 'ten', '11', '12', '13', '14'];
			var sql = "INSERT INTO settings ( " + "'id' , " + "'title' , " + "'category', " + "'appid', " + "'name' , " + "'value' , " + "'created' , " + "'modified' , " + "'user_id' , " + "'account_id' , " + "'options' , " + "'application_id' , " + "'type' , " + "'input' ) " + "VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?)"
			var sqlData = [];
			for (var str in data) {
				sqlData.push(str);
				//	log(data[str]);
			}
			transaction.executeSql(sql, sqlData);
		});
	}
	function query(sql, cb, err) {
		return DB.transaction(function(transaction) {
			transaction.executeSql(sql, [], cb, err);
		});
	}
	/**
	 * I update a local storage table
	 */
	function update(table, data, cb, err) {
		var sql = '', sqlSets = '', sqlValues = '';
		/* @TODO: Loop the key:value in the object and create the sql */
		for (var k in data) {
			if (data.hasOwnProperty(k)) {
				//	console.log(data[k]);
				sqlSets += 'user=?, ';
			}
		}
		DB.transaction(function(transaction) {
			transaction.executeSql("UPDATE " + table + " SET user=?, account=?, settings=?, created=? WHERE id = 1", [fname, bg, font, car], cb, err);
		});
	}
	/**
	 * I select all records from the database.
	 */
	function selectAll(table, cb, error) {
		log('selectAll', table, cb, error);
		var sql = "SELECT * FROM " + table + ";";
		DB.transaction(function(transaction) {
			transaction.executeSql(sql, [], dataSelectHandler, errorHandler);
		});
	}
	/**
	 *
	 */
	function updateSetting() {
		log('updateSetting');
		DB.transaction(function(transaction) {
			transaction.executeSql("UPDATE settings SET user=?, account=?, settings=?, created=? WHERE id = 1", [fname, bg, font, car]);
		});
		selectAll();
	}
	/**
	 * I update the apps session settings, with the current user, account and
	 * settings
	 *
	 * @param {Object} user - The user object.
	 * @param {Object} account - The account object.
	 * @param {Object} settings - The settings object.
	 */
	function updateAppSettings(user, account, settings) {
		log('updateAppSettings');
		var u = JSON.stringify(user), a = JSON.stringify(account), s = JSON.stringify(settings);
		DB.transaction(function(transaction) {
			transaction.executeSql("UPDATE settings SET user=?, account=?, settings=?, created=? WHERE id = 1", [u, a, s]);
		});
		selectAll();
	}
	/**
	 *
	 */
	function dropTables() {
		log('dropTables');
		DB.transaction(function(transaction) {
			transaction.executeSql("DROP TABLE ame_settings;", [], nullDataHandler, errorHandler);
			transaction.executeSql("DROP TABLE app_settings;", [], nullDataHandler, errorHandler);
			transaction.executeSql("DROP TABLE settings;", [], nullDataHandler, errorHandler);
		});
		location.reload();
	}
	/**
	 *
	 * @param {Object} e
	 */
	function dataSelectHandler(e) {
		console.log('dataSelectHandler', this);
	}
	/**
	 *
	 * @param {Object} e
	 */
	function nullDataHandler(e) {
		console.log('nullDataHandler', this);
	}
	/**
	 *
	 * @param {Object} e
	 */
	function errorHandler(e) {
		console.log('errorHandler', e);
	}
	var modify = {
		addItem : function(item) {
			items.push(item);
		}, getItems : function() {
			return items;
		}, init : initDatabase, log : log, selectAll : selectAll, updateSettings : updateAppSettings, updateSetting : updateSetting, query : query, initTable : initTable
	};
	return modify;
}]);