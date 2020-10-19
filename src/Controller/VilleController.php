<?php

namespace App\Controller;

use App\Entity\Ville;
use App\Repository\VilleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/admin")
 */
class VilleController extends AbstractController
{
    private $repository;
    private $manager;

    public function __construct(EntityManagerInterface $manager, VilleRepository $repository)
    {
        $this->repository = $repository;
        $this->manager = $manager;
    }

    /**
     * @Route("/villes", name="villes_list", methods={"GET"})
     * @param Request $request
     * @return Response
     */
    public function list(Request $request) {
        $nom = $request->get("nom");
        $villes = $this->repository->findByNomLike($nom);
        return $this->render("ville/villes.html.twig", ["villes" => $villes]);
    }

    /**
     * @Route("/villes", name="villes_persist", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function persist(Request $request) {
        $id = $request->get("id");
        $nom = $request->get("nom");
        $codePostal = $request->get("codePostal");
        $ville = $id ? $this->repository->find($id) : new Ville();
        $ville->setNom($nom);
        $ville->setCodePostal($codePostal);
        $this->manager->persist($ville);
        $this->manager->flush();
        return $this->redirectToRoute("villes_list");
    }

    /**
     * @Route("/villes/{id}", name="villes_remove", requirements={"id": "\d+"}, methods={"DELETE"})
     * @param $id
     * @param Request $request
     * @return Response
     */
    public function remove($id, Request $request) {
        $ville = $this->repository->find($id);
        $this->manager->remove($ville);
        $this->manager->flush();
        return $this->redirectToRoute("villes_list");
    }
}
