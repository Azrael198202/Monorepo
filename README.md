# Monorepo

/monorepo
│
├─ apps/
│   ├─ web-seo/              # Next.js + RN Web（前台网站 + SEO）
│   ├─ app/                  # Expo App + Expo Web（会员功能）
│   └─ admin/                # Next.js 后台管理系统
│
├─ packages/
│   ├─ ui/                   # RN UI 组件（跨 Web/App）
│   ├─ api-client/           # API 封装（OpenAPI 自动生成）
│   ├─ auth/                 # 登录/权限逻辑
│   ├─ utils/                # 公共工具库
│   └─ types/                # 数据类型（TS 共通）
│
└─ backend/
    ├─ temple-service        # Quarkus
    ├─ heritage-service
    ├─ content-service
    ├─ member-service
    └─ gateway-service


## web-seo

### create 

npx create-next-app@latest web-seo --ts --app