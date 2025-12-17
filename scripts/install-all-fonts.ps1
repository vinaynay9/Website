$repo = "C:\Users\vinay\Website"
$downloads = "$HOME\Downloads"

$fontMap = @{
  "bebas-neue"            = "BebasNeue"
  "black-ops-one"         = "BlackOpsOne"
  "bungee"                = "Bungee"
  "caveat"                = "Caveat"
  "cinzel"                = "Cinzel"
  "dancing-script"        = "DancingScript"
  "fredoka"               = "Fredoka"
  "great-vibes"           = "GreatVibes"
  "inter"                 = "Inter"
  "kalam"                 = "Kalam"
  "noto-sans-arabic"      = "NotoSansArabic"
  "noto-sans-devanagari"  = "NotoSansDevanagari"
  "noto-sans-jp"          = "NotoSansJP"
  "noto-sans-sc"          = "NotoSansSC"
  "oswald"                = "Oswald"
  "permanent-marker"      = "PermanentMarker"
  "playfair-display"      = "PlayfairDisplay"
  "righteous"             = "Righteous"
  "space-grotesk"         = "SpaceGrotesk"
}

foreach ($key in $fontMap.Keys) {

  Write-Host ""
  Write-Host "Processing $key"

  $zip = Get-ChildItem $downloads -Filter "$key*-latin.zip" | Select-Object -First 1
  if (-not $zip) {
    Write-Host "  ZIP not found, skipping"
    continue
  }

  $temp = "$downloads\_font_tmp_$key"
  if (Test-Path $temp) {
    Remove-Item $temp -Recurse -Force
  }

  Expand-Archive $zip.FullName -DestinationPath $temp -Force

  $target = "$repo\public\fonts\$($fontMap[$key])"
  New-Item -ItemType Directory -Force -Path $target | Out-Null

  Get-ChildItem $temp -Recurse -Filter "*.woff2" | ForEach-Object {

    $weight = "Regular"

    if ($_.Name -match "100") { $weight = "Thin" }
    elseif ($_.Name -match "200") { $weight = "ExtraLight" }
    elseif ($_.Name -match "300") { $weight = "Light" }
    elseif ($_.Name -match "500") { $weight = "Medium" }
    elseif ($_.Name -match "600") { $weight = "SemiBold" }
    elseif ($_.Name -match "700") { $weight = "Bold" }
    elseif ($_.Name -match "800") { $weight = "ExtraBold" }
    elseif ($_.Name -match "900") { $weight = "Black" }

    $dest = "$target\$($fontMap[$key])-$weight.woff2"
    Move-Item $_.FullName $dest -Force

    Write-Host "  Installed $dest"
  }

  Remove-Item $temp -Recurse -Force
}

Write-Host ""
Write-Host "All fonts installed successfully"
