
"use client";

import { LoadingState } from "@/types/loadingState";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { useRouter } from 'next/navigation';

export function LoadingModal( props:any) {
    const { loadingState, openModal, setOpenModal } = props;
    
  const router = useRouter();
  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Bilgilendirme</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {
                   loadingState.fileUploaded ? 'Dosya Yüklendi' : loadingState.fileError ?  '' : (
                    <>
                      Dosya yükleniyor <span className="spinner m-3"></span>
                    </>
                  ) 
                }
                {
                   loadingState.fileError && <ErrorMessage>Dosya içeriği alınamadı</ErrorMessage>
                }
              
            </div>
            <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {
                   loadingState.questionsPrepared ? 'Test Oluşturuldu' : loadingState.questionsError ?  '' : (
                    <>
                      Test Oluşturuluyor... <span className="spinner m-3"></span>
                    </>
                  )
                }
                {
                   loadingState.questionsError && <ErrorMessage>Sorular oluşturulamadı</ErrorMessage>
                }
            </div>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {
                   loadingState.questionsPrepared && 
                   <>
                    Toplamda <strong>{loadingState.questionCount}</strong>  soru için <strong>{loadingState.time}</strong>  dakika sürelik sınavınız oluşturuldu. 
                   </>
                   
                }
                
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {setOpenModal(false); router.push('/student/quiz')}} disabled={loadingState.questionsError}>Testi Başlat</Button>
          <Button color="gray" onClick={() => {setOpenModal(false)}}>
            İptal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
