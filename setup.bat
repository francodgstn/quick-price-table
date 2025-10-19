@echo off
echo ========================================
echo Quick Price Table - Setup Script
echo ========================================
echo.

:: Check if git directory exists
if not exist "C:\git\" (
    echo Creating C:\git directory...
    mkdir "C:\git"
)

:: Check if target directory already exists
if exist "C:\git\quick-price-table\" (
    echo WARNING: C:\git\quick-price-table already exists!
    echo Please backup or remove the existing folder first.
    pause
    exit /b 1
)

:: Copy project to C:\git
echo Copying project files to C:\git\quick-price-table...
xcopy "%~dp0*" "C:\git\quick-price-table\" /E /I /H /Y

echo.
echo Project copied successfully!
echo.
echo Next steps:
echo 1. Open a terminal in C:\git\quick-price-table
echo 2. Run: npm install
echo 3. Run: npm start
echo.
echo Opening the project folder...
explorer "C:\git\quick-price-table"

pause
