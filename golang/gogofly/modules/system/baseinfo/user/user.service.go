package user

import (
	"errors"

	"github.com/gogofly/modules/core/base"
	"github.com/gogofly/modules/system/baseinfo/user/dto"
	"github.com/gogofly/types"
)

type UserService struct {
	base.BaseService
	dao *UserDao
}

var userService *UserService

func NewService() *UserService {
	if userService == nil {
		userService = &UserService{
			dao: NewDao(),
		}
	}

	return userService
}

func (us *UserService) Create( data *dto.CreateUserDto) (*dto.UserResponse, error) {
	err := us.validateOnCreate(data)
	if err != nil {
		return nil, err
	}
	user, err := us.dao.Create(data)
	ret := dto.UserResponse{}
	if err != nil {
		return &ret, err
	}
	ret.FillModel(user)
	return &ret, err
}

func (us *UserService) validateOnCreate(data *dto.CreateUserDto) error {
	user, err := us.dao.FindUserByUsername(data.UserName)
	if err != nil {
		return err
	}
	if user.Id >0 {
		return errors.New("用户名已存在")
	}
	return nil
}

func (us *UserService) Update(id uint,data *dto.UpdateUserDto) (*dto.UserResponse, error) {
	err := us.validateOnUpdate(id, data)
	if err!= nil {
		return nil, err
	}
	
	user, err := us.dao.Update(id, data)
	if err!= nil {
		return nil, err
	}

	ret := dto.UserResponse{}
	ret.FillModel(user)
	return &ret, err
}

func (us *UserService) validateOnUpdate(id uint, data *dto.UpdateUserDto) error {
	user, err := us.dao.FindOne(id)
	if err!= nil {
		return err
	}
	if user.Id ==0 {
		return errors.New("用户不存在")
	}

	
	user, err = us.dao.FindUserByUsername(data.UserName)
	if err!= nil {
		return err
	}
	if(user.Id !=0 && user.Id != id) {
		return errors.New("用户名已存在")
	}
	return nil
}

func (us *UserService) Delete(id uint) error {
	return us.dao.Delete(id)
}

func (us *UserService) FindOne(id uint) (*dto.UserResponse, error) {
	user, err := us.dao.FindOne(id)
	ret := dto.UserResponse{}
	if err!= nil {
		return &ret, err
	}
	
	ret.FillModel(user)
	return &ret, err
}

func (us *UserService) FindList(data *dto.FindUserListDto) (types.FindListData[dto.UserResponse], error) {
	result, err := us.dao.FindList(*data)
	if err!= nil {
		return types.FindListData[dto.UserResponse]{}, err
	}
	
	ret := []*dto.UserResponse{}
	for _, v := range result.Items {
		var item dto.UserResponse
		item.FillModel(v)
		ret = append(ret, &item)
	}
	
	return types.FindListData[dto.UserResponse]{
		Total: result.Total,
		Items:  ret	,
	}, err
}