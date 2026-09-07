"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "@/icons";
import { ShieldCheck, UserPlus, Lock } from "lucide-react";
import Link from "next/link";

interface AdminUser {
  id: string;
  user: string;
  email: string;
  role: "Administrateur Principal" | "Gestionnaire Secondaire";
  isPrimary: boolean;
  date: string;
  activeStatus: "Actif" | "Suspendu";
  avatar: string;
}

const initialAdmins: AdminUser[] = [
  {
    id: "ADM-001",
    user: "Sulson Admin (Fondateur)",
    email: "admin@epicesdesulson.com",
    role: "Administrateur Principal",
    isPrimary: true,
    date: "01 Sept, 2026",
    activeStatus: "Actif",
    avatar: "/images/admin/user_01.png",
  },
  {
    id: "ADM-002",
    user: "Équipe Opérations & Stocks",
    email: "contact@epicesdesulson.com",
    role: "Gestionnaire Secondaire",
    isPrimary: false,
    date: "05 Sept, 2026",
    activeStatus: "Actif",
    avatar: "/images/admin/user_02.png",
  },
];

export default function AdminListTable() {
  const [admins, setAdmins] = useState<AdminUser[]>(initialAdmins);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(admins.map((a) => a.id));
    } else {
      setSelectedRows([]);
    }
  };

  const toggleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  const isAllSelected =
    admins.length > 0 && selectedRows.length === admins.length;

  return (
    <div className="bg-white rounded-2xl w-full border border-gray-200/90 shadow-2xs overflow-hidden">
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck className="size-5 text-emerald-600" />
              <span>Gestion des Administrateurs</span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              1 Administrateur Principal propriétaire + accès délégués secondaires
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <Link
              href="/admin-users/add"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <UserPlus className="size-4" />
              <span>+ Administrateur Secondaire</span>
            </Link>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/70 hover:bg-gray-50/70 border-y border-gray-200">
            <TableHead className="w-[50px] pl-6">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">ID</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">Administrateur</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">Email de Connexion</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">Rôle & Privilèges</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">Créé le</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">Statut</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600 pr-6 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins
            .slice((currentPage - 1) * 10, currentPage * 10)
            .map((item) => (
              <TableRow
                key={item.id}
                className="border-b last:border-0 border-gray-100 hover:bg-gray-50/50"
              >
                <TableCell className="pl-6 whitespace-nowrap">
                  <Checkbox
                    checked={selectedRows.includes(item.id)}
                    onCheckedChange={(checked) =>
                      toggleSelectRow(item.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="font-mono text-xs text-gray-500 whitespace-nowrap">
                  {item.id}
                </TableCell>
                <TableCell className="text-xs whitespace-nowrap text-gray-900 font-bold">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 relative shrink-0 overflow-hidden rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-700">
                      {item.isPrimary ? "👑" : "👤"}
                    </div>
                    <span>{item.user}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-gray-600 whitespace-nowrap font-mono">
                  {item.email}
                </TableCell>
                <TableCell className="text-xs whitespace-nowrap">
                  {item.isPrimary ? (
                    <Badge variant="success" className="font-bold flex items-center gap-1 w-fit">
                      <Lock className="size-3" />
                      <span>Principal (Protégé)</span>
                    </Badge>
                  ) : (
                    <Badge variant="default" className="w-fit">
                      Secondaire
                    </Badge>
                  )}
                </TableCell>

                <TableCell className="text-xs text-gray-600 whitespace-nowrap">
                  {item.date}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge variant={item.activeStatus === "Actif" ? "success" : "warning"}>
                    {item.activeStatus}
                  </Badge>
                </TableCell>
                <TableCell className="pr-6 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="icon"
                      href={`/admin-users/edit?id=${item.id}`}
                      className="hover:text-primary transition-colors p-1.5"
                      title="Modifier les accès"
                    >
                      <Pencil className="size-4" />
                    </Button>
                    {!item.isPrimary && (
                      <Button
                        variant="icon"
                        className="hover:text-red-500 transition-colors p-1.5 text-gray-400"
                        title="Révoquer l'accès"
                        onClick={() => {
                          setAdmins((prev) => prev.filter((a) => a.id !== item.id));
                        }}
                      >
                        <Trash className="size-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div className="p-4 sm:p-6 border-t border-gray-100 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          {admins.length} compte(s) administrateur(s) configuré(s)
        </p>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.max(1, Math.ceil(admins.length / 10))}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
