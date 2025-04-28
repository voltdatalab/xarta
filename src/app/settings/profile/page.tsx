"use client";

import { SharedDefaults } from '@/components/SharedDefaults';
import EditarPerfil from '@/components/Xarta/EditarPerfil';
import { Footer } from '@/components/Xarta/Footer';
import { Header } from '@/components/Xarta/Header';
import { getXartaConfig } from '@/config/getConfig';

export default async function SettingsProfilePage() {

  const config = await getXartaConfig();

  return (
    <SharedDefaults config={config}>
      <Header></Header>
      <EditarPerfil config={config} />
      <Footer/>
    </SharedDefaults>
  );
}