<?php


namespace App\Service;


use App\Entity\Sortie;
use App\Repository\EtatRepository;

class SortieService
{
    function isEditable($sortie, $participant) {
        $isOld = in_array($sortie->getEtat()->getId(), [4, 5, 6]);
        $isNotOwned = $sortie->getOrganisateur() != $participant;
        return !$isOld && !$isNotOwned;
    }

    function setEtat($sortie, $status, EtatRepository $etat) {
        if ($status === 1 || $status === 6) {
            $sortie->setEtat($etat->find($status));
        } else {
            $beginning = $sortie->getDateHeureDebut();
            $ending = $beginning->getTimestamp() + $sortie->getDuree();
            $closing = $sortie->getDateLimiteInscription();
        }
    }
}