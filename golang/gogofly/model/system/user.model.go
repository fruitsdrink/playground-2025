package system

import (
	"github.com/gogofly/types"
	"gorm.io/plugin/soft_delete"
)

type User struct {
	types.BaseModelWithId
	UserName string `gorm:"size:64;not null;comment:'名称';uniqueIndex:udx_name" json:"userName"`
	Password string `gorm:"size:128;not null;comment:'密码'" json:"-"`
	RealName string `gorm:"comment:'真实姓名'" json:"realName"`
	Email string `gorm:"comment:'邮箱'" json:"email"`
	Avatar string `gorm:"comment:'头像'" json:"avatar"`
	Phone string `gorm:"comment:'手机号'" json:"phone"`
	Status uint `gorm:"size:1;default:0;not null;comment:'状态'" json:"status"`

	DeletedAt soft_delete.DeletedAt `gorm:"comment:'删除时间';uniqueIndex:udx_name" json:"deletedAt"`
	DeletedBy *uint `gorm:"comment:'删除人Id'" json:"deletedBy"`
}