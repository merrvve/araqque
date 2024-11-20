"use client";

import { useUserStore } from "../stores/userStore";
import { useRouter } from "next/navigation";
import { Avatar, Dropdown } from "flowbite-react";

export default function Navbar() {
  const { user, isAuthenticated, signOut } = useUserStore();
  const router = useRouter();

  const handleSignOut = async () => {
    // Clear session cookie on the server (if needed)
    
    // Clear user state in the store
    signOut();

    // Redirect to home or login page
    router.push("/");
  };

  return (
    <nav className="flex justify-between p-3 shadow-lg">
      <div>
        <a href={"/"}>
          <h1 className="text-2xl font-extrabold p-2">Araqque</h1>
        </a>
      </div>
      <div>
        {isAuthenticated ? (
          <div className="flex flex-end gap-3">
            <div>
            <Dropdown label={<Avatar rounded />} arrowIcon={false} inline>
              <Dropdown.Header>
                <span className="block text-sm">Hoşgeldiniz</span>
                <span className="block truncate text-sm font-bold">
                 {user?.name || user?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Ayarlar</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Çıkış Yap</Dropdown.Item>
            </Dropdown>
            </div>
            

            
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
}
