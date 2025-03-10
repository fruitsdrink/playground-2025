package seed

import "github.com/gogofly/global"

func Seed() {
	if !global.Settings.Db.EnableSeed {
		return
	}

	if global.DB == nil {
		panic("db is nil")
	}

	userSeed.Seed(global.DB)
}