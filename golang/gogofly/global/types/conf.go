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
}