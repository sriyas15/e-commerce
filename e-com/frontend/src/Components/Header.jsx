
const Header = () => {
  return (
    <main>

        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost text-xl">E-Commerce</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                <li><a href="/cart">Cart (1)</a></li>
                <li>
                    <details>
                    <summary>Riyas</summary>
                    <ul className="bg-base-100 rounded-t-none p-2">
                        <li><a>Profile</a></li>
                        <li><a>Light</a></li>
                        <li><a>Log Out</a></li>
                    </ul>
                    </details>
                </li>
                </ul>
            </div>
        </div>

    </main>
  )
}

export default Header