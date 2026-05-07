@echo off
echo ========================================
echo Pornire aplicatie Carousel Party DJ
echo ========================================
echo.
echo [i] MySQL este pornit pe portul 3306.
echo.
echo Pornire Backend intr-o fereastra noua...
start "Carousel Party DJ - Backend" cmd /k "cd /d c:\Users\chitu\Desktop\DJAppSolidus\aplicatieDJ-TBSolidus\backend && (npm start || pause)"

echo Configurare legatura Frontend - Backend (Proxy)...
cd /d c:\Users\chitu\Desktop\DJAppSolidus\aplicatieDJ-TBSolidus\frontend
call npm pkg set proxy="http://localhost:5001"
> c:\Users\chitu\Desktop\DJAppSolidus\aplicatieDJ-TBSolidus\frontend\.env echo REACT_APP_API_URL=/api

echo Pornire Frontend intr-o fereastra noua...
start "Carousel Party DJ - Frontend" cmd /k "cd /d c:\Users\chitu\Desktop\DJAppSolidus\aplicatieDJ-TBSolidus\frontend && npm start"

echo.
echo Asteptam 15 secunde pentru ca serverele sa porneasca complet inainte de Ngrok...
timeout /t 15 /nobreak

echo Pornire Ngrok pentru Interfata (Frontend - port 3000)...
start "Ngrok - Frontend UI" cmd /k "ngrok http 3000 --host-header=rewrite"

echo.
echo ====================================================================
echo [!] GATA! Toate componentele pornesc in fundal.
echo.
echo Pentru DJ (tu): Acceseaza http://localhost:3000/dj in browser.
echo Pentru Invitati: Trimite-le link-ul din fereastra Ngrok!
echo ====================================================================