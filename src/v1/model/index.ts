import {Sequelize} from 'sequelize';


const sequelize = new Sequelize(process.env.DB_EXTERNAL_URL!, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false, 
});

let connection;

if (!connection)
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database Connected Successfully");
      connection = true;
    })
    .catch((err) => {
      console.error("Database Connection Error:", err);
    });
	
export default sequelize;