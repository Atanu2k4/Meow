Write-Host "🐾 Starting Meow Release Packaging..." -ForegroundColor Cyan

Write-Host "`n[1/3] Building Windows Executable using electron-builder..." -ForegroundColor Yellow
# Run the npm build command and pipe its output to standard output
cmd.exe /c "npm run build-win"

Write-Host "`n[2/3] Preparing the Meow App Executable..." -ForegroundColor Yellow
# Find the generated executable (e.g. "Meow 1.0.0.exe")
$exePath = Get-ChildItem -Path "meow_web\public\downloads\Meow *.exe" | Select-Object -First 1
if ($exePath) {
    $targetPath = "meow_web\public\downloads\Meow.exe"
    if (Test-Path $targetPath) {
        Remove-Item $targetPath -Force
    }
    Rename-Item -Path $exePath.FullName -NewName "Meow.exe"
    Write-Host "✅ Executable ready at meow_web\public\downloads\Meow.exe" -ForegroundColor Green
} else {
    Write-Host "❌ Could not find Meow executable. Did the build fail?" -ForegroundColor Red
}

Write-Host "`n[3/3] Zipping the Browser Extension..." -ForegroundColor Yellow
if (Test-Path -Path "meow-extension\*") {
    Compress-Archive -Path "meow-extension\*" -DestinationPath "meow_web\public\downloads\meow-extension.zip" -Force
    Write-Host "✅ Zipped to meow-extension.zip" -ForegroundColor Green
}

Write-Host "`n🎉 Release packaging complete! All files are updated in meow_web\public\downloads\" -ForegroundColor Green
