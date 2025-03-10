package base

type Base struct{}


func (b *Base) TryCatch(fn func(), catch func(error)){
	defer func() {
		if err := recover(); err != nil {
			catch(err.(error))
		}
	}()
	fn()
}