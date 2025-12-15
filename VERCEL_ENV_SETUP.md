# Vercel Environment Variables Setup

After pushing your code, you need to configure environment variables in Vercel:

## Steps to Configure Vercel

1. **Go to your Vercel project dashboard:**
   - Visit: https://vercel.com/dashboard
   - Select your `synced-seven` project

2. **Navigate to Settings → Environment Variables**

3. **Add the following variable:**

   ```
   Variable Name:  VITE_API_URL
   Value:          https://synced-proto.onrender.com
   Environments:   ✓ Production  ✓ Preview  ✓ Development
   ```

4. **Save and Redeploy:**
   - After saving the environment variable
   - Go to "Deployments" tab
   - Click the three dots (⋯) on the latest deployment
   - Select "Redeploy"
   - Check "Use existing Build Cache" (optional)
   - Click "Redeploy"

## Why This Is Needed

- Vercel does **not** automatically read `.env.production` files
- Environment variables must be set in the Vercel dashboard
- The `VITE_API_URL` variable tells your frontend where the backend API is located

## Verification

After redeployment, check that:

1. Visit https://synced-seven.vercel.app
2. Open browser DevTools (F12) → Console
3. Try logging in - you should no longer see 404 errors
4. The API calls should go to `https://synced-proto.onrender.com`

## Troubleshooting

If you still see 404 errors:

- Verify the environment variable is set correctly in Vercel
- Make sure you redeployed after adding the variable
- Check that your Render backend is running at `https://synced-proto.onrender.com`
- Test the backend directly: `curl https://synced-proto.onrender.com/health`
