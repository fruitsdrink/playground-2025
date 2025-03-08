package conf

import (
	"fmt"
	"time"

	"github.com/gogofly/model"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
)



func InitDB(settings *SettingsConfig, dbLogger logger.Writer) (*gorm.DB, error) {


	dsn := createDsn(settings, dbLogger)
	logger := createLogger(settings, dbLogger)

	db, err := createDB(dsn, logger, settings)

	if err != nil {
		return nil, err
	}
	
	autoMigrate(db, settings, dbLogger)

	return db, nil
}


func createDsn(settings *SettingsConfig, dbLogger logger.Writer) string {
	host := settings.Db.Host
	port := settings.Db.Port
	user := settings.Db.User
	password := settings.Db.Password
	dbname := settings.Db.DbName


	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local", user, password, host, port, dbname)
	dbLogger.Printf("数据库连接字符串: %s", dsn)

	return dsn
}

func createLogger(settings *SettingsConfig, dbLogger logger.Writer) logger.Interface {
	logMode := logger.Info
	if(!settings.Db.LogSql){
		logMode = logger.Error
	}

	logger := logger.New(
		dbLogger,
		logger.Config{
			SlowThreshold: time.Second, // 慢 SQL 阈值
			LogLevel:      logMode,     // Log level
			IgnoreRecordNotFoundError: true,   // 忽略ErrRecordNotFound（记录未找到）错误
			ParameterizedQueries:      false,   // 不包括参数占位符
			Colorful:      false,       // 禁用彩色打印
		},
	)

	return logger	
}

func createDB(dsn string, logger logger.Interface, settings *SettingsConfig) (*gorm.DB, error){
	tablePrefix := settings.Db.TablePrefix
	maxIdleConns := settings.Db.MaxIdleConns
	maxOpenConns := settings.Db.MaxOpenConns
	maxLifetime := settings.Db.ConnMaxLifetime

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			TablePrefix:   tablePrefix,
			// 使用单数表名，不带s
			SingularTable: true,
		},
		Logger: logger,
	})

	if(err == nil){
		sqlDB,_ := db.DB()
		if maxIdleConns !=0 {
			sqlDB.SetMaxIdleConns(maxIdleConns)
		}
		if maxOpenConns !=0 {
			sqlDB.SetMaxOpenConns(maxOpenConns)
		}
		if maxLifetime !="" {
			duration, err := time.ParseDuration(maxLifetime)
			if err == nil {
				sqlDB.SetConnMaxLifetime(duration)
			}
		}
	}

	return db, err
}

func autoMigrate(db *gorm.DB, settings *SettingsConfig, dbLogger logger.Writer) {
	autoMigrate := settings.Db.AutoMigrate

	if autoMigrate {
		// 自动迁移
		dbLogger.Printf("开始自动迁移")
		err := db.AutoMigrate(model.Models...)
		if err!= nil {
			dbLogger.Printf("自动迁移失败: ", err)
			panic("自动迁移失败: " + err.Error())
		}else{
			dbLogger.Printf("自动迁移成功")
		}
	}
}
