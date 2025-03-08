package system

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	UserName string `gorm:"size:64;not null;comment:'名称'"`
	Password string `gorm:"size:128;not null;comment:'密码'"`
	RealName string `gorm:"comment:'真实姓名'"`
	Email string `gorm:"comment:'邮箱'"`
	Avatar string `gorm:"comment:'头像'"`
	Phone string `gorm:"comment:'手机号'"`
	Status uint `gorm:"size:1;default:0;not null;comment:'状态'"`
}