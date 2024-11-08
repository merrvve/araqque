
"use client";


import { Button, Modal } from "flowbite-react";
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
                   loadingState.fileUploaded && !loadingState.fileError ? 'Dosya Yüklendi' : loadingState.fileError || loadingState.questionsError ?  '' : (
                    <>
                      Dosya yükleniyor <span className="loader m-3"></span>
                    </>
                  ) 
                }
                {
                   loadingState.fileError && <ErrorMessage>Dosya içeriği alınamadı</ErrorMessage>
                }
              
            </div>
            <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400 mb-3">
              {loadingState?.statusText}
            </div>
            <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {
                   loadingState.questionsPrepared ? 'Test Oluşturuldu' : loadingState.questionsError || loadingState.fileError ?  '' : (
                    <>
                      Test Oluşturuluyor... <span className="loader m-3"></span>
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
