export interface IAuthUser {
  userId: string;
  username?: string;
  walletAddress?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  createAt: number;
  updateAt: number;
	isOwner?:boolean
	
  // Clerk default data : https://clerk.com/docs/backend-requests/making/jwt-templates#default-claims
  azp: string;
  exp: number; // 令牌过期的时间，作为 Unix 时间戳。使用令牌生命周期模板设置确定。
  iat: number; // 颁发令牌的时间，作为 Unix 时间戳（例如 1516239022 ）
  iss: string; // 实例的前端 API URL（例如 https://clerk.your-site.com ）
  nbf: number; // 令牌被视为无效之前的时间，作为 Unix 时间戳。使用“允许的时钟偏差”模板设置确定。
  jti: string; // 随机字母数字字符串，用作令牌的唯一标识符
  sub: string; // 用户的唯一 ID（例如 user_abc1234def57 ）
}
