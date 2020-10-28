<?php

namespace App\Controller;

use App\Repository\ParticipantRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ParticipantController extends AbstractController
{
    private $repository;
    private $manager;

    public function __construct(EntityManagerInterface $manager, ParticipantRepository $repository)
    {
        $this->repository = $repository;
        $this->manager = $manager;
    }

    /**
     * @Route("/participant/{id}", name="participant_display", requirements={"id": "\d+"})
     * @param int $id
     * @return Response
     */
    public function display(int $id) {
        $participant = $this->repository->find($id);
        if ($participant != null) { return $this->render('participant/display.html.twig', ["participant" => $participant]); }
        else { return $this->redirectToRoute("sorties_display"); }
    }
}
