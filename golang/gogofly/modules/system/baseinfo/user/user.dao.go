package user

import (
	"errors"

	"github.com/gogofly/model/system"
	"github.com/gogofly/modules/core/base"
	"github.com/gogofly/modules/system/baseinfo/user/dto"
	"github.com/gogofly/types"
)

type UserDao struct {
	base.BaseDao
}

var userDao *UserDao

func NewDao() *UserDao {
	if userDao == nil {
		userDao = &UserDao{
			base.NewDao(),
		}
	}
	return userDao
}

func (d *UserDao) Create(data *dto.CreateUserDto) (*system.User, error) {
	var user system.User = data.ToModel()

	err := d.Orm.Create(&user).Error

	return &user, err
}

func (d *UserDao) Update(id uint, data *dto.UpdateUserDto)(*system.User, error){
	user := data.ToModel()
	user.Id = id
	err := d.Orm.Updates(&user).Error
	return &user, err
}

func (d *UserDao) Delete(id uint) error {
	var user system.User
	err := d.Orm.Delete(&user, id).Error
	return err
}

func (d *UserDao) FindUserByUsername(userName string) (*system.User, error){
	var user system.User
	d.Orm.Where("user_name = ?", userName).First(&user)
	return &user, nil
}

func (d *UserDao) FindOne(id uint) (*system.User, error){
	var user system.User
	err := d.Orm.First(&user, id).Error
	if err != nil {
		return nil, errors.New("用户不存在")
	}
	return &user, err
} 

func (d *UserDao) FindList(data dto.FindUserListDto) (types.FindListData[system.User], error){
	var users []*system.User
	var total int64
	pagination := types.PaginationDto{
		Page: data.Page,
		Size: data.Size,
	}
	keyword := data.Keyword

	
	scope := d.Orm.Model(&system.User{}).Scopes(d.Pagination(pagination))
	if keyword != "" {
		scope = scope.Where("user_name LIKE?", "%"+keyword+"%")
	}
	err := scope.Find(&users).Offset(-1).Limit(-1).Count(&total).Error

	if err != nil {
		return types.FindListData[system.User]{}, err
	}
	return types.FindListData[system.User]{
		Items: users,
		Total: total,
	}, nil
}