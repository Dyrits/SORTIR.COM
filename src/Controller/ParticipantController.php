<?php

namespace App\Controller;

use App\Form\RegistrationFormType;
use App\Repository\ParticipantRepository;
use App\Security\LoginFormAuthenticator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Guard\GuardAuthenticatorHandler;

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
        if($participant == $this->getUser()) { return $this->redirectToRoute("participant_persist"); }
        if ($participant != null) { return $this->render('participant/display.html.twig', ["participant" => $participant]); }
        else { return $this->redirectToRoute("sorties_display"); }
    }

    /**
     * @Route("/participant/persist", name="participant_persist")
     * @param Request $request
     * @return Response
     */
    public function persist(Request $request, UserPasswordEncoderInterface $passwordEncoder, GuardAuthenticatorHandler $guardHandler, LoginFormAuthenticator $authenticator) {
        $participant = $this->getUser();

        // Creating the form using the same form used to register a new user, and handling the request.
        $editForm =$this->createForm(RegistrationFormType::class, $participant);
        $editForm->handleRequest($request);

        // Handling the form submission.
        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $participant->setPassword(
                $passwordEncoder->encodePassword(
                    $participant,
                    $editForm->get('plainPassword')->getData()
                )
            );
            // Set the roles:
            $admin = $editForm->get('administrateur')->getData();
            $roles[] = "ROLE_USER";
            if ($admin) { $roles[] = "ROLE_ADMIN"; }
            $participant->setRoles($roles);

            // Persisting the entity.
            $this->manager->persist($participant);
            $this->manager->flush();
            // Redirecting.
            return $this->redirectToRoute("participant_display", ["id" => $participant->getId()]);
        }
        // Refresh the user:
        $this->manager->refresh($participant);
        // Redirecting if the form is not submitted.
        return $this->render("participant/persist.html.twig", ["registrationForm" => $editForm->createView(), "participant" => $participant]);
    }
}
