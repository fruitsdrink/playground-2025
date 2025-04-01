package seed

import (
	"github.com/gogofly/model/system"
	"github.com/gogofly/utils"
	"gorm.io/gorm"
)

type UserSeed struct {}

var userSeed *UserSeed

func (s *UserSeed) Seed(db *gorm.DB) {
	var user system.User

	// 检查是否存在UserName为admin的用户
	db.Model(&user).Where("user_name = ?", "admin").First(&user)

	if user.Id == 0 {
		// 创建admin用户
		password, err := utils.HashPassword("admin123")
		if err != nil {
			panic("密码加密失败:"+err.Error())
		}
		db.Create(&system.User{
			UserName: "admin",
			RealName: "系统管理员",
			Password: password,
			Status: 1,
		})
	}
}