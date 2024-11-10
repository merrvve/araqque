
"use client";

import { Sidebar } from "flowbite-react";
import { LuUserSquare2, LuUsers2, LuArrowRightFromLine, LuBookOpen, LuLayoutDashboard  } from "react-icons/lu";
export function TrainerSidenav() {
  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/trainer" icon={LuLayoutDashboard}>
            Panel Ana Sayfa
          </Sidebar.Item>
          <Sidebar.Collapse icon={LuBookOpen} label="Ödevler">
            <Sidebar.Item href="/trainer">Yeni Ödev No Oluştur</Sidebar.Item>
            <Sidebar.Item href="/trainer">Ödevleri Listele</Sidebar.Item>
            <Sidebar.Item href="/trainer">Analizler</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item href="/trainer" icon={LuUsers2}>
            Öğrenciler
          </Sidebar.Item>
          <Sidebar.Item href="/trainer" icon={LuUserSquare2}>
            Hesabım
          </Sidebar.Item>
          <Sidebar.Item href="/trainer" icon={LuArrowRightFromLine }>
            Çıkış Yap
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
