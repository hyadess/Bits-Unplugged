module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "kuddusmia",
  DB_USER: process.env.DB_USER || "postgres",
  DB_HOST: process.env.DB_HOST || "localhost",

  // DB_HOST: process.env.DB_HOST || "db.mnqhazjbbmyvpwbzjfoi.supabase.co",
  DB_DB: process.env.DB_DB || "bitsunplugged",
  DB_PASS: process.env.DB_PASS || "root",
  // DB_PASS: process.env.DB_PASS || "#include<D1h@n.h>",

  DB_PORT: process.env.DB_PORT || "5432",
  PORT: process.env.PORT || "5000",
  ADMIN_PASS:
    process.env.ADMIN_PASS ||
    "$2a$10$yGG7Td2huTYO8YUlbRQKb.lJ6aNCYuhkMivF/yAxygtnF81MoHcTK",
};
// db.mnqhazjbbmyvpwbzjfoi.supabase.co
// #include<D1h@n.h>
