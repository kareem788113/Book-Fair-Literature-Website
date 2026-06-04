$htmlFiles = Get-ChildItem -Path "c:\Users\Arasc\Desktop\Final" -Filter "*.html" -Recurse | Where-Object { $_.FullName -notlike "*\admin\*" }

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Update navigation menu links
    $updatedContent = $content -replace '<a href="book-clubs.html" class="nav-book-clubs">', '<a href="forum.html" class="nav-book-clubs">'
    
    # Update any other book clubs links
    $updatedContent = $updatedContent -replace '<a href="book-clubs.html"', '<a href="forum.html"'
    
    # Write the updated content back to the file
    Set-Content -Path $file.FullName -Value $updatedContent
}

Write-Host "Book Clubs links updated in all HTML files."
