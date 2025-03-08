package conf

import (
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/gogofly/global/types"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gopkg.in/natefinch/lumberjack.v2"
)



func InitLogger(settings *types.SettingsConfig) *zap.SugaredLogger {
	encoder := getEncoder()
	writers := getWriters(settings)
	writeSyncer := zapcore.NewMultiWriteSyncer(writers...)
	core := zapcore.NewCore(encoder, writeSyncer, getLevel(settings.Log.Level))
	
	// return zap.New(core).Sugar()
	logger := zap.New(core, zap.AddCaller())
	defer logger.Sync()
	return logger.Sugar()
}



func getEncoder() zapcore.Encoder {
	encoderConfig := zap.NewProductionEncoderConfig()
	encoderConfig.TimeKey = "time"
	encoderConfig.EncodeLevel = zapcore.CapitalLevelEncoder
	encoderConfig.EncodeTime = func(t time.Time, pae zapcore.PrimitiveArrayEncoder) {
		pae.AppendString(t.Local().Format(time.DateTime))
	}
	return zapcore.NewJSONEncoder(encoderConfig)
}

func getWriters(settings *types.SettingsConfig) []zapcore.WriteSyncer {
	writers := []zapcore.WriteSyncer{}
	if settings.Log.Console {
		writers = append(writers, getConsoleWriter())
	}
	writers = append(writers, getFileWriteSyncer(settings))
	return writers
}
func getConsoleWriter() zapcore.WriteSyncer {
	return zapcore.AddSync(os.Stdout)
}

func getFileWriteSyncer(settings *types.SettingsConfig) zapcore.WriteSyncer {
	separator := string(filepath.Separator)
	rootDir, _ := os.Getwd()
	logFilePath := rootDir + separator + settings.Log.Path + separator + time.Now().Format(time.DateOnly) + ".log"
	lumberjackSyncer := &lumberjack.Logger{
		Filename: logFilePath,
		MaxSize:  settings.Log.MaxSize,
		MaxBackups: settings.Log.MaxBackups,
		MaxAge: settings.Log.MaxAge,
		Compress: settings.Log.Compress,
	}
	return zapcore.AddSync(lumberjackSyncer)
}

func getLevel(level string) zapcore.Level {
	// 将入参转换为小写
	level = strings.ToLower(level)
	switch level {
	case "debug":
		return zapcore.DebugLevel
	case "info":
		return zapcore.InfoLevel
	case "warn":
		return zapcore.WarnLevel
	case "error":
		return zapcore.ErrorLevel
	case "dpanic":
		return zapcore.DPanicLevel
	case "panic":
		return zapcore.PanicLevel
	case "fatal":
		return zapcore.FatalLevel
	default:
		return zapcore.InfoLevel
	}
}