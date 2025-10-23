#!/bin/bash
# Quick Fix Script for AI Malfunction
# This script helps you set up environment variables for local development

echo "🔧 AI Malfunction Quick Fix Script"
echo "=================================="
echo ""

# Check if .env already exists
if [ -f .env ]; then
    echo "⚠️  .env file already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborting. Edit .env manually or delete it first."
        exit 1
    fi
fi

# Create .env from example
cp .env.example .env
echo "✅ Created .env file from template"
echo ""

echo "📝 You need to add 3 environment variables:"
echo ""
echo "1️⃣  OPENAI_API_KEY"
echo "   Get it from: https://platform.openai.com/api-keys"
echo ""
read -p "Enter your OpenAI API key (starts with sk-proj-): " OPENAI_KEY
echo ""

echo "2️⃣  SUPABASE_URL"
echo "   Get it from: Supabase Dashboard → Settings → API → Project URL"
echo ""
read -p "Enter your Supabase URL (https://xxx.supabase.co): " SUPABASE_URL_INPUT
echo ""

echo "3️⃣  SUPABASE_SERVICE_ROLE_KEY"
echo "   Get it from: Supabase Dashboard → Settings → API → service_role (secret!)"
echo ""
read -p "Enter your Supabase service role key (starts with eyJ): " SUPABASE_KEY
echo ""

# Update .env file
cat > .env << EOF
# ==============================================
# SUPABASE CONNECTION
# ==============================================
DATABASE_URL="${SUPABASE_URL_INPUT/https:\/\//postgresql://postgres:your-password@}/postgres"
SUPABASE_URL="${SUPABASE_URL_INPUT}"
SUPABASE_SERVICE_ROLE_KEY="${SUPABASE_KEY}"

# ==============================================
# OPENAI API
# ==============================================
OPENAI_API_KEY="${OPENAI_KEY}"

# ==============================================
# SERVER CONFIGURATION
# ==============================================
PORT=5000
NODE_ENV=development

# ==============================================
# STRIPE (Optional - leave empty if not using payments)
# ==============================================
STRIPE_PUBLIC_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
EOF

echo "✅ Environment variables saved to .env"
echo ""
echo "🎯 Next Steps:"
echo "1. Verify your credentials are correct"
echo "2. Run: npm run dev"
echo "3. Test AI features at http://localhost:5000"
echo ""
echo "📚 For Netlify deployment, see: AI_MALFUNCTION_DIAGNOSIS.md"
echo ""
echo "⚠️  Remember: NEVER commit .env to git!"
echo ""
echo "✨ Done! Your AI should now work locally."
