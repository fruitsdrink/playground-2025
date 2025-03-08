package types

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
type SettingsConfig struct {
	// 模式配置
	Mode modeConfig `mapstructure:"mode"`
	// 服务配置
	Server serverConfig `mapstructure:"server"`
	// swagger配置
	Swagger swaggerConfig `mapstructure:"swagger"`
	// 日志配置
	Log logConfig `mapstructure:"log"`
}