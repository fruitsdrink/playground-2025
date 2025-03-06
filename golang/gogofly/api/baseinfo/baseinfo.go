package baseinfo

type IBaseInfoApi struct {
	userApi *IUserApi
}

func NewBaseInfoApi() *IBaseInfoApi {
	return &IBaseInfoApi{
		userApi: newUserApi(),
	}
}
