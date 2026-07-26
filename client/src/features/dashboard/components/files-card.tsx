"use client";

import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type File = {
  id: string;
  name: string;
  updatedAt: string;
};

type FilesCardProps = {
  files: File[];
};

export function FilesCard({ files }: FilesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <FileText className="h-4 w-4" />
          Files
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {files.map((file) => (
          <div key={file.id} className="rounded-lg border p-3">
            <p className="text-sm font-medium">{file.name}</p>

            <p className="text-xs text-muted-foreground">{file.updatedAt}</p>
          </div>
        ))}

        <Button variant="outline" className="w-full">
          View Files
        </Button>
      </CardContent>
    </Card>
  );
}
