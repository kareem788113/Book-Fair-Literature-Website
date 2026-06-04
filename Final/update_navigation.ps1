$htmlFiles = Get-ChildItem -Path "c:\Users\Arasc\Desktop\Final" -Filter "*.html" -Recurse | Where-Object { $_.FullName -notlike "*\admin\*" }

$standardNavigation = @"
                <ul class="nav-menu">
                    <li><a href="index.html" class="nav-home">Home</a></li>
                    <li><a href="books.html" class="nav-books">Books</a></li>
                    <li><a href="authors.html" class="nav-authors">Authors</a></li>
                    <li><a href="publishers.html" class="nav-publishers">Publishers</a></li>
                    <li><a href="book-clubs.html" class="nav-book-clubs">Book Clubs</a></li>
                    <li><a href="events.html" class="nav-events">Events</a></li>
                    <li><a href="blog.html" class="nav-blog">Blog</a></li>
                    <li><a href="forum.html" class="nav-forum">Forum</a></li>
                    <li><a href="contact.html" class="nav-contact">Contact</a></li>
                    <li class="user-actions">
                        <a href="login.html" id="loginBtn"><i class="fas fa-sign-in-alt"></i> Login</a>
                        <a href="dashboard.html" id="profileBtn" style="display: none;"><i class="fas fa-user"></i> Profile</a>
                    </li>
                </ul>
"@

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Get the filename for setting active class
    $filename = $file.Name
    
    # Create a version of the navigation with the appropriate active class
    $pageNavigation = $standardNavigation
    
    # Set the active class based on the current page
    switch -Wildcard ($filename) {
        "index.html" { 
            $pageNavigation = $pageNavigation -replace 'class="nav-home"', 'class="nav-home active"' 
        }
        "books.html" { 
            $pageNavigation = $pageNavigation -replace 'class="nav-books"', 'class="nav-books active"' 
        }
        "book-details.html" { 
            $pageNavigation = $pageNavigation -replace 'class="nav-books"', 'class="nav-books active"' 
        }
        "authors.html" { 
            $pageNavigation = $pageNavigation -replace 'class="nav-authors"', 'class="nav-authors active"' 
        }
        "publishers.html" { 
            $pageNavigation = $pageNavigation -replace 'class="nav-publishers"', 'class="nav-publishers active"' 
        }
        "book-clubs.html" { 
            $pageNavigation = $pageNavigation -replace 'class="nav-book-clubs"', 'class="nav-book-clubs active"' 
        }
        "events.html" { 
            $pageNavigation = $pageNavigation -replace 'class="nav-events"', 'class="nav-events active"' 
        }
        "event-details.html" { 
            $pageNavigation = $pageNavigation -replace 'class="nav-events"', 'class="nav-events active"' 
        }
        "blog.html" { 
            $pageNavigation = $pageNavigation -replace 'class="nav-blog"', 'class="nav-blog active"' 
        }
        "forum.html" { 
            $pageNavigation = $pageNavigation -replace 'class="nav-forum"', 'class="nav-forum active"' 
        }
        "contact.html" { 
            $pageNavigation = $pageNavigation -replace 'class="nav-contact"', 'class="nav-contact active"' 
        }
    }
    
    # Replace the navigation menu in the file
    $pattern = '<ul class="nav-menu">[\s\S]*?</ul>'
    $updatedContent = $content -replace $pattern, $pageNavigation
    
    # Write the updated content back to the file
    Set-Content -Path $file.FullName -Value $updatedContent
}

Write-Host "Navigation menus updated in all HTML files."
