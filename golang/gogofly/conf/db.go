package conf

import (
	"fmt"
	"time"

	"github.com/gogofly/global"
	"github.com/gogofly/model"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
)

type customerLogger struct {
}

// Printf(string, ...interface{})
func (l customerLogger) Printf(format string, v ...interface{}) {
	global.Logger.Infof(format, v...)
}

func InitDB() *gorm.DB {


	dsn := createDsn()
	logger := createLogger()

	db, err := createDB(dsn, logger)

	if err != nil {
		global.Logger.Fatal("数据库连接失败: ", err)
		panic("数据库连接失败: " + err.Error())
	}
	global.Logger.Info("数据库连接成功")
	
	autoMigrate(db)

	return db
}


func createDsn() string {
	host := global.Settings.Db.Host
	port := global.Settings.Db.Port
	user := global.Settings.Db.User
	password := global.Settings.Db.Password
	dbname := global.Settings.Db.DbName


	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local", user, password, host, port, dbname)
	global.Logger.Info("数据库连接字符串: ", dsn)

	return dsn
}

func createLogger() logger.Interface {
	logMode := logger.Info
	if(!global.Settings.Db.LogSql){
		logMode = logger.Error
	}

	logger := logger.New(
		customerLogger{},
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

func createDB(dsn string, logger logger.Interface) (*gorm.DB, error){
	tablePrefix := global.Settings.Db.TablePrefix
	maxIdleConns := global.Settings.Db.MaxIdleConns
	maxOpenConns := global.Settings.Db.MaxOpenConns
	maxLifetime := global.Settings.Db.ConnMaxLifetime

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

func autoMigrate(db *gorm.DB) {
	autoMigrate := global.Settings.Db.AutoMigrate

	if autoMigrate {
		// 自动迁移
		global.Logger.Info("开始自动迁移")
		err := db.AutoMigrate(model.Models...)
		if err!= nil {
			global.Logger.Fatal("自动迁移失败: ", err)
			panic("自动迁移失败: " + err.Error())
		}else{
			global.Logger.Info("自动迁移成功")
		}
	}
}
