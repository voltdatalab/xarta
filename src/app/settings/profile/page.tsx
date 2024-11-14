"use client";

import { SharedDefaults } from '@/components/SharedDefaults';
import EditarPerfil from '@/components/Xarta/EditarPerfil';
import { Footer } from '@/components/Xarta/Footer';
import { Header } from '@/components/Xarta/Header';

export default function SettingsProfilePage() {

  return (
    <SharedDefaults>
      <Header></Header>
      <EditarPerfil />
      <Footer/>
    </SharedDefaults>
  );
}