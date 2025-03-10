package base

import (
	"github.com/gogofly/global"
	"gorm.io/gorm"
)

type BaseDao struct {
	Orm *gorm.DB
}

func getOrm() *gorm.DB {
	return global.DB
}

func NewDao() BaseDao {
	return BaseDao{
		Orm: getOrm(),
	}
}