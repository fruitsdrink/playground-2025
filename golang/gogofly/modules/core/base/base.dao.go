package base

import (
	"github.com/gogofly/global"
	"github.com/gogofly/types"
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

// 分页
func (d *BaseDao) Pagination(p types.PaginationDto) func(orm *gorm.DB) *gorm.DB{
	return func (orm *gorm.DB) *gorm.DB  {
		return orm.Offset(p.GetOffset()).Limit(p.GetSize())
	}
}