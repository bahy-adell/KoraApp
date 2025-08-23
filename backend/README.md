# Kora App Backend - Vercel Deployment Guide

## Prerequisites
- Node.js 18+ installed
- Vercel CLI installed (`npm i -g vercel`)
- MongoDB connection string
- Environment variables configured

## Local Development
```bash
npm install
npm run dev
```

## Building for Production
```bash
npm run build
```

## Vercel Deployment

### 1. Environment Variables
Make sure to set these environment variables in your Vercel project:

**Required:**
- `DB` - MongoDB connection string
- `JWT_SECRET_KEY` - Secret key for JWT tokens
- `JWT_EXPIRED_TIME` - JWT expiration time
- `NODE_ENV` - Set to "production"

**Optional:**
- `BASE_URL` - Your frontend URL
- `APP_NAME` - Application name
- `EMAIL_USERNAME` - Email service username
- `EMAIL_PASSWORD` - Email service password
- `EMAIL_HOST` - Email service host
- `EMAIL_PORT` - Email service port
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

### 2. Deploy to Vercel
```bash
# Login to Vercel
vercel login

# Deploy
vercel --prod

# Or use the Vercel dashboard
```

### 3. Build Settings
- **Framework Preset**: Node.js
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Function Configuration
- **Max Duration**: 30 seconds (configured in vercel.json)
- **Memory**: 1024 MB (default)

## Troubleshooting 404 Errors

### Common Causes:
1. **Missing build output**: Ensure `npm run build` creates the `dist` folder
2. **Incorrect entry point**: Verify `dist/app.js` exists and is properly exported
3. **Environment variables**: Check all required env vars are set in Vercel
4. **Database connection**: Ensure MongoDB connection string is valid
5. **CORS issues**: Verify `BASE_URL` is set correctly

### Debug Steps:
1. Check Vercel function logs in the dashboard
2. Verify the build output in the `dist` folder
3. Test database connectivity
4. Check environment variables are loaded

## Project Structure
```
backend/
├── dist/           # Compiled JavaScript (created by build)
├── Routes/         # API routes
├── controllers/    # Route controllers
├── Models/         # Database models
├── middlwares/     # Express middlewares
├── DB_config/      # Database configuration
├── app.ts          # Main application file
├── vercel.json     # Vercel configuration
└── package.json    # Dependencies and scripts
```

## API Endpoints
The API will be available at your Vercel domain (e.g., `https://your-app.vercel.app`)

## Support
If you continue to experience issues:
1. Check Vercel function logs
2. Verify all environment variables are set
3. Ensure database is accessible from Vercel's servers
4. Check CORS configuration matches your frontend domain
