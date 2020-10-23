<?php

namespace App\Controller;

use App\Entity\Lieu;
use App\Entity\Sortie;
use App\Form\SortieType;
use App\Repository\EtatRepository;
use App\Repository\ParticipantRepository;
use App\Repository\SortieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SortieController extends AbstractController
{
    private $repository;
    private $manager;

    public function __construct(EntityManagerInterface $manager, SortieRepository $repository)
    {
        $this->repository = $repository;
        $this->manager = $manager;
    }

    /**
     * @Route("/sortie/{id}", name="sortie_display", requirements={"id": "\d+"})
     */
    public function display($id) {
        $sortie = $this->repository->find($id);
        return $this->render('sortie/display.html.twig', ["sortie" => $sortie]);
    }

    /**
     * @Route("/sortie/{id}/edit", name="sortie_persist", requirements={"id": "\d+"}, defaults={"id": 0})
     * @param int $id
     * @param Request $request
     * @param EtatRepository $etat
     * @param ParticipantRepository $participant
     * @return RedirectResponse|Response
     */
    public function persist(int $id, Request $request, EtatRepository $etat, ParticipantRepository $participant) {
        $sortie = new Sortie();
        if ($id) { $sortie =  $this->repository->find($id); }
        if (!$sortie) { return $this->redirectToRoute("sortie_persist"); }
        $sortieForm =$this->createForm(SortieType::class, $sortie );
        $sortieForm->handleRequest($request);
        if ($sortieForm->isSubmitted() && $sortieForm->isValid()) {
            // @todo: Set the parameters according to the current user and the status:
            $sortie->setEtat($etat->find(1));
            $organisateur = $participant->find(1);
            $sortie->setOrganisateur($participant->find(1));
            $sortie->setSiteOrganisateur($organisateur->getCampus());
            $this->manager->persist($sortie);
            $this->manager->flush();
            return $this->redirectToRoute("sortie_display", ["id" => $sortie->getId()]);
        }
        return $this->render("sortie/edit.html.twig", ["sortieForm" => $sortieForm->createView(), "sortie" => $sortie]);
    }

    /**
     * @Route("/sorties/api", name="sorties_list", methods={"GET"})
     * @param Request $request
     * @return Response
     */
    public function list(Request $request) {
        $sorties = $this->repository->findAll();
        return $this->json($sorties);
    }
}
