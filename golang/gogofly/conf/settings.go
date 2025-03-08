package conf

import (
	"os"

	"github.com/gogofly/global/types"
	"github.com/gogofly/utils"
	"github.com/spf13/viper"
)


func InitSettings() *types.SettingsConfig {
	
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

	settings := &types.SettingsConfig{}
	err = viper.Unmarshal(settings)
	if err != nil {
		panic("Unmarshal Config Error: " + err.Error())
	}
	
	setDefaultValue(settings)

	return settings
}

func setDefaultValue(settings *types.SettingsConfig){

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
	
}





