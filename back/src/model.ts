import { Sequelize, DataTypes, Deferrable, Utils } from 'sequelize';
import path from 'path';

const database = new Sequelize({
	dialect: 'sqlite',
	storage: path.join(path.dirname(''), 'sqlite.db'),
	define: {
		timestamps: false,
		freezeTableName: true
	}
});

// Utilisateur(idUtil {pk}, pwd)
export const utilisateur = database.define(
	'Utilisateur',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		pwd: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{}
);

// Paragraphe(idPara {pk}, contenu, estVerrouillé, estConclusion)
export const paragraphe = database.define(
	'Paragraphe',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		contenu: {
			type: DataTypes.STRING,
			allowNull: true
		},
		estVerrouillé: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		estConclusion: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	},
	{}
);

// Histoire(idHist {pk}, estOuverte, estPublique, idAuteur {fk}, idParaInit {fk})
export const histoire = database.define(
	'Histoire',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		titre: {
			type: DataTypes.STRING,
			allowNull: false
		},
		idAuteur: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: utilisateur,
				key: 'id'
			}
		},
		idParaInit: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: paragraphe,
				key: 'id'
			}
		},
		estOuverte: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		estPublique: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	},
	{}
);

// EcritPar(idUtil {pk, fk}, idPara {fk})
export const ecritPar = database.define(
	'EcritPar',
	{
		idUtil: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: {
				model: utilisateur,
				key: 'id'
			}
		},
		idPara: {
			type: DataTypes.INTEGER,
			references: {
				model: paragraphe,
				key: 'id'
			}
		}
	},
	{}
);

// Collaborateur(idHist {pk, fk}, idUtil {pk, fk})
export const collaborateur = database.define(
	'Collaborateur',
	{
		idHist: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: {
				model: histoire,
				key: 'id'
			}
		},
		idUtil: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: {
				model: utilisateur,
				key: 'id'
			}
		}
	},
	{}
);

// APourChoix(idPara {pk, fk}, idChoix {fk}, titreChoix, condition)
export const aPourChoix = database.define(
	'APourChoix',
	{
		idPara: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: {
				model: paragraphe,
				key: 'id'
			}
		},
		idChoix: {
			type: DataTypes.INTEGER,
			references: {
				model: paragraphe,
				key: 'id'
			}
		},
		titreChoix: {
			type: DataTypes.STRING,
			allowNull: false
		},
		condition: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: paragraphe,
				key: 'id'
			}
		}
	},
	{}
);

// Historique(idUtil {pk, fk}, idHist {pk, fk}, arrayPara)
export const historique = database.define(
	'Historique',
	{
		idUtil: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: {
				model: utilisateur,
				key: 'id'
			}
		},
		idHist: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: {
				model: histoire,
				key: 'id'
			}
		},
		arrayPara: {
			type: DataTypes.ARRAY(DataTypes.INTEGER),
			allowNull: false
		}
	},
	{}
);

// Sync les models a la db
await database.sync({ force: true });
console.log('All models were synchronized successfully.');
