/*
 * @Author: CookChopper
 * @Date: 2021-11-23 21:36:40
 * @LastEditTime: 2021-12-13 19:41:12
 * @LastEditors: CookChopper
 * @Description: getters
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.userInfo.username,
  userId: state => state.user.userInfo.userId,
  staffPhoto: state => state.user.userInfo.staffPhoto,
  companyId: state => state.user.userInfo.companyId,
  routes: state => state.permission.routes
}
export default getters
