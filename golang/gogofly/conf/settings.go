package conf

import (
	"os"

	"github.com/gogofly/utils"
	"github.com/spf13/viper"
)

type modeConfig struct {
	// 运行模式, dev 开发模式, prod 生产模式
	Dev bool `mapstructure:"dev"`
}

// 服务配置
type serverConfig struct{
	// 服务名称
	Name string `mapstructure:"name"`
	// 服务端口号
	Port int `mapstructure:"port"`
}

// swagger配置
type swaggerConfig struct{
	// 是否开启swagger
	Enable bool `mapstructure:"enable"`
	Title string `mapstructure:"title"`
	Description string `mapstructure:"description"`
	Version string `mapstructure:"version"`
	Path string `mapstructure:"path"`
}

// 日志配置
type logConfig struct {
	// 日志级别
	Level string `mapstructure:"level"`
	// 日志路径
	Path string `mapstructure:"path"`
	// 日志大小，单位为MB
	MaxSize int `mapstructure:"maxSize"`
	// 日志保留时间，单位为天
	MaxAge int `mapstructure:"maxAge"`
	// 日志备份数量
	MaxBackups int `mapstructure:"maxBackups"`
	// 是否压缩
	Compress bool `mapstructure:"compress"`
	// 是否开启控制台输出
	Console bool `mapstructure:"console"`
}

// 数据库配置
type dbConfig struct{
	// 数据库地址
	Host string `mapstructure:"host"`
	// 数据库端口号
	Port int `mapstructure:"port"`
	// 数据库用户名
	User string `mapstructure:"user"`
	// 数据库密码
	Password string `mapstructure:"password"`
	// 数据库名称
	DbName string `mapstructure:"dbname"`
	// 数据库表前缀
	TablePrefix string `mapstructure:"tablePrefix"`
	// 是否开启sql日志
	LogSql bool `mapstructure:"logSql"`
	// 最大空闲连接数
	MaxIdleConns int `mapstructure:"maxIdleConns"`
	// 最大打开连接数
	MaxOpenConns int `mapstructure:"maxOpenConns"`
	// 连接最大复用时间,支持1s/1m/1h
	ConnMaxLifetime string `mapstructure:"connMaxLifetime"`
	// 是否自动迁移
	AutoMigrate bool `mapstructure:"autoMigrate"`
}

// redis配置
type redisConfig struct{
	// redis地址
	Url string `mapstructure:"url"`
	// redis密码
	Password string `mapstructure:"password"`
	// redis数据库名称
	Db int `mapstructure:"db"`
	// key前缀
	Prefix string `mapstructure:"prefix"`
}

// 配置
type SettingsConfig struct {
	// 模式配置
	Mode modeConfig `mapstructure:"mode"`
	// 服务配置
	Server serverConfig `mapstructure:"server"`
	// swagger配置
	Swagger swaggerConfig `mapstructure:"swagger"`
	// 日志配置
	Log logConfig `mapstructure:"log"`
	// 数据库配置
	Db dbConfig `mapstructure:"db"`
	// redis配置
	Redis redisConfig `mapstructure:"redis"`
}


func InitSettings() *SettingsConfig {
	
	settingsName := utils.If(os.Getenv("SETTINGS_NAME")!= "", string(os.Getenv("SETTINGS_NAME")), "settings").(string)
	settingsPath := utils.If(os.Getenv("SETTINGS_PATH")!= "", string(os.Getenv("SETTINGS_PATH")), "./conf").(string)
	settingsType := utils.If(os.Getenv("SETTINGS_TYPE")!= "", string(os.Getenv("SETTINGS_TYPE")), "yaml").(string)
	
	viper.SetConfigName(settingsName)
	viper.SetConfigType(settingsType)
	viper.AddConfigPath(settingsPath)

	err := viper.ReadInConfig()
	if err != nil {
		panic("Read Config Error: " + err.Error())
	}

	settings := &SettingsConfig{}
	err = viper.Unmarshal(settings)
	if err != nil {
		panic("Unmarshal Config Error: " + err.Error())
	}
	
	setDefaultValue(settings)

	return settings
}

func setDefaultValue(settings *SettingsConfig){

	if settings.Server.Name == "" {
		settings.Server.Name = "Gogofly"
	}
	if settings.Server.Port == 0 {
		settings.Server.Port = 8080
	}
	if settings.Log.Level == "" {
		settings.Log.Level = "info"
	}
	if settings.Log.Path == "" {
		settings.Log.Path = "./log"
	}
	if settings.Log.MaxSize == 0 {
		settings.Log.MaxSize = 1
	}
	if settings.Log.MaxAge == 0 {
		settings.Log.MaxAge = 28
	}
	if settings.Log.MaxBackups == 0 {
		settings.Log.MaxBackups = 3
	}
	if settings.Swagger.Title == "" {
		settings.Swagger.Title = "Gogofly"
	}
	if settings.Swagger.Description == "" {
		settings.Swagger.Description = "Gogofly"
	}
	if settings.Swagger.Version == "" {
		settings.Swagger.Version = "1.0.0"
	}
	if settings.Swagger.Path == "" {
		settings.Swagger.Path = "/swagger"
	}

	// 判断swagger的Path是否以/开头
	if settings.Swagger.Path[0] != '/' {
		settings.Swagger.Path = "/" + settings.Swagger.Path
	}
	// 判断swagger的Path是否以/结尾，如果是则去掉
	if settings.Swagger.Path[len(settings.Swagger.Path)-1] == '/' {
		settings.Swagger.Path = settings.Swagger.Path[:len(settings.Swagger.Path)-1]
	}
	// 如果Swagger的Path不是以*any结尾,则加上
	if settings.Swagger.Path[len(settings.Swagger.Path)-4:] != "*any" {
		settings.Swagger.Path = settings.Swagger.Path + "/*any"
	}

	if settings.Db.Host == "" {
		settings.Db.Host = "127.0.0.1"
	}
	if settings.Db.Port == 0 {
		settings.Db.Port = 3306
	}
	if settings.Db.User == "" {
		settings.Db.User = "root"
	}
	if settings.Db.Password == "" {
		settings.Db.Password = ""
	}
	
	if settings.Db.TablePrefix == "" {
		settings.Db.TablePrefix = "sys_"
	}
	
	if settings.Redis.Url == "" {
		settings.Redis.Url = "127.0.0.1:6379"
	}
	if settings.Redis.Password == "" {
		settings.Redis.Password = ""
	}
	if settings.Redis.Db == 0 {
		settings.Redis.Db = 0
	}
	if settings.Redis.Prefix == "" {
		settings.Redis.Prefix = ""
	}
}





