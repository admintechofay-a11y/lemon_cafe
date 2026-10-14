@echo off
echo Pushing Lemon Cafe code to GitHub...
cd /d "C:\Users\HP\OneDrive\Desktop\technofy office work\cafe"
git push -u origin main
echo.
if %errorlevel% equ 0 (
    echo ========================================================
    echo SUCCESS! All code pushed to:
    echo https://github.com/admintechofay-a11y/lemon_cafe
    echo ========================================================
) else (
    echo An error occurred. Please check your GitHub permissions or sign in.
)
pause
